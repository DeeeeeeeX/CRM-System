import { ActionReducerMapBuilder, Draft } from '@reduxjs/toolkit';

export interface IAsyncParticle<T> {
  data: T | null;
  error: unknown;
  errorCounter: number;
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

export const initAsyncParticle = <T extends unknown>(data: T | null = null): IAsyncParticle<T> => ({
  data,
  error: null,
  errorCounter: 0,
  status: 'idle',
});

export const addAsyncBuilderCases = <TState>(
  builder: ActionReducerMapBuilder<TState>,
  sliceMethod: unknown,
  key: keyof TState,
) => {
  builder.addCase(sliceMethod.pending, (state: Draft<TState>) => {
    state[String(key)].status = 'pending';
  });
  builder.addCase(sliceMethod.fulfilled, (state: Draft<TState>, action) => {
    state[String(key)].status = 'fulfilled';
    state[String(key)].errorCounter = 0;
    state[String(key)].data = action.payload;
  });
  builder.addCase(sliceMethod.rejected, (state: Draft<TState>, action) => {
    state[String(key)].error = action.payload;
    state[String(key)].errorCounter = (state[String(key)].errorCounter ?? 0) + 1;
    state[String(key)].status = 'rejected';
  });
};
