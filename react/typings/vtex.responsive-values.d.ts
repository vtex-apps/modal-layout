declare module 'vtex.responsive-values' {
  export type MaybeResponsiveInput<T> = T | ResponsiveInput<T>

  export const useResponsiveValue: (prop: ResponsiveInput<T> | T) => T
  export const useResponsiveValues: (props: Record<string, MaybeResponsiveInput<any>>) => Record<string, any>

  export interface ResponsiveInput<T> {
    mobile: T
    desktop: T
    tablet: T
  }

}
