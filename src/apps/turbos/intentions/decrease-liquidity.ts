import { TransactionType } from '@msafe/sui3-utils';
import { SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import { WalletAccount } from '@mysten/wallet-standard';
import { Network, TurbosSdk } from 'turbos-clmm-sdk';

import { BaseIntention } from '@/apps/interface/sui';

import { DecreaseLiquidityIntentionData, SuiNetworks, TransactionSubType } from '../types';

export class DecreaseLiquidityIntention extends BaseIntention<DecreaseLiquidityIntentionData> {
  txType!: TransactionType.Other;

  txSubType!: TransactionSubType.AddLiquidity;

  constructor(public override readonly data: DecreaseLiquidityIntentionData) {
    super(data);
  }

  async build(input: { network: SuiNetworks; suiClient: SuiClient; account: WalletAccount }): Promise<Transaction> {
    const turbosSdk = new TurbosSdk(input.network.replace('sui:', '') as Network, input.suiClient);
    const { pool, address, amountA, amountB, slippage, nft, decreaseLiquidity, deadline, txb } = this.data;

    return turbosSdk.pool.decreaseLiquidity({
      pool,
      slippage,
      address,
      amountA,
      amountB,
      nft,
      decreaseLiquidity,
      deadline,
      txb,
    });
  }

  static fromData(data: DecreaseLiquidityIntentionData) {
    return new DecreaseLiquidityIntention(data);
  }
}
