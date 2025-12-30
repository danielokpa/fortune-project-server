export interface GenerateReferalCodeEvent {
  readonly userId: string;
  readonly usedReferalCode?: string;
  readonly referalUserId?: string;
}