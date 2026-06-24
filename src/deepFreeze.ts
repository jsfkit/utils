/**
 * Recursively freezes an object and all of its nested properties, preventing any modifications to
 * the object or its children.
 */
export function deepFreeze<T extends object> (obj: T): Readonly<T> {
  for (const name of Object.getOwnPropertyNames(obj)) {
    const value = (obj as Record<string, unknown>)[name];
    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }
  return Object.freeze(obj);
}
