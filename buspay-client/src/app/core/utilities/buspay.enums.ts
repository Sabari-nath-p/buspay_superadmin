export enum ToastType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

export enum ButtonStyles {
  Primary = 1,
  Secondary = 2,
  Ternary = 3,
  WithIcon = 4,
}

export enum Sizes {
  Small = 1,
  Medium = 2,
  Large = 3,
  ExtraLarge = 4,
  DoubleExtraLarge = 5,
  Max = 6,
}

// Add more..
export enum StatusCode {
  Success = 200,
  NotFound = 404,
  UnAuthorized = 403,
}

export enum UserStatus {
  ACTIVE = 'active',
  OFFLINE = 'offline',
  DEACTIVATED = 'deactivated',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

export enum SettleStatus {
  REQUESTED = 'requested',
  PENDING = 'pending',
  REJECTED = 'rejected',
  APPROVED = 'approved',
}
