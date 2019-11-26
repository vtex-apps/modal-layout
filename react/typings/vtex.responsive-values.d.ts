declare module 'vtex.responsive-values' {
  export const useResponsiveValue: (prop: ResponsiveInput<T> | T) => T

  export interface ResponsiveInput<T> {
    mobile: T
    desktop: T
    tablet: T
  }
}