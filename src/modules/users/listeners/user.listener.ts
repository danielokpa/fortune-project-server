import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import type { GenerateReferalCodeEvent } from '../events/user.events';
import { UserRepository } from '../repositories/user.repository';
import { ReferredUserService } from '../../referred-users/services/referred-user.service';
import * as randomstring from 'randomstring';

@Injectable()
export class UserEventListener {
  private readonly logger = new Logger(UserEventListener.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly referredUserService: ReferredUserService,
  ) {}

  @OnEvent('user.generate-referal-code')
  async handleGenerateReferalCode(event: GenerateReferalCodeEvent) {
    try {
      this.logger.log(`Processing referral code for user ${event.userId}`);

      // Check if user already has a referral code
      const user = await this.userRepository.findById(event.userId);
      if (!user) {
        this.logger.error(`User ${event.userId} not found`);
        return;
      }

      // Handle referral tracking if a referral code was used during signup
      if (event.usedReferalCode) {
        await this.handleReferralTracking(event.userId, event.usedReferalCode);
      }

      // Generate referral code for the new user if they don't have one
      if (user.referalCode) {
        this.logger.log(`User ${event.userId} already has referral code: ${user.referalCode}`);
        return;
      }

      // Generate unique referral code
      let referalCode: string | undefined;
      let isUnique = false;
      let attempts = 0;
      const maxAttempts = 10;

      while (!isUnique && attempts < maxAttempts) {
        referalCode = randomstring.generate({
          length: 10,
          charset: 'alphanumeric',
        });
        
        // Check if code already exists
        const existingUser = await this.userRepository.findByReferalCode(referalCode);
        if (!existingUser) {
          isUnique = true;
        } else {
          attempts++;
          this.logger.warn(`Referral code ${referalCode} already exists, generating new one...`);
        }
      }

      if (!isUnique || !referalCode) {
        this.logger.error(`Failed to generate unique referral code after ${maxAttempts} attempts`);
        return;
      }

      // Update user with referral code
      await this.userRepository.update(event.userId, { referalCode });
      this.logger.log(`Successfully generated referral code ${referalCode} for user ${event.userId}`);
      return;
    } catch (error) {
      this.logger.error(`Failed to process referral code for user ${event.userId}:`, error);
    }
  }

  private async handleReferralTracking(referredUserId: string, usedReferalCode: string) {
    try {
      this.logger.log(`Processing referral tracking for user ${referredUserId} with code ${usedReferalCode}`);

      // Check if user is trying to use their own referral code
      const currentUser = await this.userRepository.findById(referredUserId);
      if (currentUser?.referalCode === usedReferalCode) {
        this.logger.warn(`User ${referredUserId} attempted to use their own referral code. Skipping.`);
        return;
      }

      // Find the user who owns this referral code (excluding the current user)
      const referrerUser = await this.userRepository.findByReferalCode(usedReferalCode, referredUserId);
      if (!referrerUser) {
        this.logger.warn(`Referral code ${usedReferalCode} not found or belongs to the same user. Skipping referral tracking.`);
        return;
      }

      // Validate that the referral code actually belongs to the referrer user
      if (referrerUser.referalCode !== usedReferalCode) {
        this.logger.error(
          `Referral code mismatch: User ${referrerUser.id} has referral code ${referrerUser.referalCode}, but ${usedReferalCode} was used. Skipping.`,
        );
        return;
      }

      // Ensure the referrer user ID matches
      if (!referrerUser.id) {
        this.logger.error(`Referrer user ${referrerUser.id} has invalid ID. Skipping referral tracking.`);
        return;
      }

      // Check if this user was already referred (prevent duplicate records)
      const existingReferral = await this.referredUserService.findByReferredUserId(referredUserId);
      if (existingReferral) {
        this.logger.log(`User ${referredUserId} was already referred. Skipping duplicate record.`);
        return;
      }

      // Create referral record with validated referrer user
      await this.referredUserService.create({
        referalCode: usedReferalCode,
        userId: referrerUser.id, // Ensure userId matches referrerUser.id
        referredUserId: referredUserId,
        completedRides: 0,
        hasRewarded: false,
      });

      this.logger.log(
        `Successfully created referral record: Referrer user ${referrerUser.id} (code: ${referrerUser.referalCode}) referred user ${referredUserId} with code ${usedReferalCode}`,
      );
    } catch (error) {
      this.logger.error(`Failed to handle referral tracking:`, error);
    }
  }

}

