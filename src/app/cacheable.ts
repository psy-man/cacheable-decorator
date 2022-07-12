import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

export function Cacheable(options: { secondsToExpiration: number } = {secondsToExpiration: 999999999}) {
  const cache = new Map<string, any>();

  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any) {
      // ClassName / Method / params (might be not so trivial)
      const key = `${target.constructor.name}/${propertyKey}/${JSON.stringify(args)}`;

      if (cache.has(key)) {
        const cachedValue = cache.get(key);

        if (cachedValue.expiresAt > Date.now()) {
          console.log('value got from cache');
          return of(cachedValue.value);
        }

        cache.delete(key);
      }

      return originalMethod.apply(this, args).pipe(
        tap((response) => {
          cache.set(key, {
            expiresAt: Date.now() + options.secondsToExpiration * 1000,
            value: response,
          });
          console.log('value got from http');
          return response;
        })
      );
    };

    return descriptor;
  };
}
