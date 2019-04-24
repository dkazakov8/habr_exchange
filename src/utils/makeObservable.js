import { action, computed, decorate, observable } from 'mobx';

export function makeObservable(target) {
  /**
   * Для методов - биндим контекст this + все изменения сторов
   * выполняем в одной транзакции
   *
   * Для геттеров - оборачиваем в computed
   *
   */

  const classPrototype = target.prototype;
  const methodsAndGetters = Object.getOwnPropertyNames(classPrototype).filter(
    methodName => methodName !== 'constructor'
  );

  for (const methodName of methodsAndGetters) {
    const descriptor = Object.getOwnPropertyDescriptor(
      classPrototype,
      methodName
    );

    descriptor.value = decorate(classPrototype, {
      [methodName]:
        typeof descriptor.value === 'function' ? action.bound : computed,
    });
  }

  return (...constructorArguments) => {
    /**
     * Параметры, за исключением rootStore, трансформируем в
     * observable
     *
     */

    const store = new target(...constructorArguments);
    const staticProperties = Object.keys(store);

    staticProperties.forEach(propName => {
      if (propName === 'rootStore') {
        return false;
      }

      const descriptor = Object.getOwnPropertyDescriptor(store, propName);

      Object.defineProperty(
        store,
        propName,
        observable(store, propName, descriptor)
      );
    });

    return store;
  };
}
