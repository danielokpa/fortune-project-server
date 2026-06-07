// inventory.listener.ts
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InventoryListener {
  constructor(private readonly prisma: PrismaService) {}

  @OnEvent('inventory.quantity.changed', { async: true })
  async handleInventoryChanged(): Promise<void> {
    console.log('Listener reached');
    // ── DEPLETE: mark out-of-stock items as unavailable ──────────────────────

    // 1. Products without variants: zero/null quantity → unavailable
    await this.prisma.product.updateMany({
      where: {
        hasVariants: false,
        OR: [
          { availableQuantity: { lte: 0 } },
          { availableQuantity: null },
        ],
      },
      data: { isAvailable: false },
    });

    // 2. Variants: zero/null quantity → unavailable
    await this.prisma.productVariant.updateMany({
      where: {
        OR: [
          { availableQuantity: { lte: 0 } },
          { availableQuantity: null },
        ],
      },
      data: { isAvailable: false },
    });

    // 3. Products with variants: all variants unavailable → product unavailable
    const fullyDepletedProducts = await this.prisma.product.findMany({
      where: { hasVariants: true },
      select: {
        id: true,
        variants: { select: { isAvailable: true } },
      },
    });

    const fullyDepletedIds = fullyDepletedProducts
      .filter((p) => p.variants.length > 0 && p.variants.every((v) => !v.isAvailable))
      .map((p) => p.id);

    if (fullyDepletedIds.length > 0) {
      await this.prisma.product.updateMany({
        where: { id: { in: fullyDepletedIds } },
        data: { isAvailable: false },
      });
    }

    // ── RESTORE: re-enable items whose stock was replenished (e.g. cancellation) ─

    // 4. Variants with stock restored → re-enable
    await this.prisma.productVariant.updateMany({
      where: { availableQuantity: { gt: 0 } },
      data: { isAvailable: true },
    });

    // 5. Products without variants with stock restored → re-enable
    await this.prisma.product.updateMany({
      where: {
        hasVariants: false,
        availableQuantity: { gt: 0 },
      },
      data: { isAvailable: true },
    });

    // 6. Fresh query — step 4 mutated variant isAvailable flags, so the
    //    earlier snapshot is stale. Re-fetch to get accurate state.
    const restoredProducts = await this.prisma.product.findMany({
      where: { hasVariants: true },
      select: {
        id: true,
        variants: { select: { isAvailable: true } },
      },
    });

    // Products with variants: at least one variant now available → re-enable product
    const partiallyRestoredIds = restoredProducts
      .filter((p) => p.variants.some((v) => v.isAvailable))
      .map((p) => p.id);

    if (partiallyRestoredIds.length > 0) {
      await this.prisma.product.updateMany({
        where: { id: { in: partiallyRestoredIds } },
        data: { isAvailable: true },
      });
    }
  }
}
