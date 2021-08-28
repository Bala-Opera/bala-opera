import { Transition } from 'react-spring';

export function reverseTransition<T, Result extends UseTransitionProps<T>>(
  arr: Result[],
): Result[] {
  const result: Result[] = [];
  for (let idx = 0; idx < arr.length; idx++) {
    result.push({
      ...arr[idx],
      props: arr[arr.length - 1 - idx].props,
    });
  }
  return result;
}
