declare module 'vtex.css-handles' {
  export function useCssHandles<ClassKey extends string = string>(handles: ClassKey[]): Record<ClassKey, string>
  export function generateBlockClass(baseClass: string, blockClass?: string): string
}
