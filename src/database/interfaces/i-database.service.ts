

export interface IDatabaseService {
  connect(): Promise<void>;
  close(): Promise<void>;
}
