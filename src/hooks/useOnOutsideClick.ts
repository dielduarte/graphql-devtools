import { useEffect, RefObject } from 'react';

function isDescendant(parent: any, child: any) {
  let node = child.parentNode;

  while (node != null) {
    // noinspection EqualityComparisonWithCoercionJS
    if (node == parent) return true;

    node = node.parentNode;
  }

  return false;
}

function useOnOutsideClick(
  containerRef: RefObject<any>,
  onClick: VoidFunction
) {
  useEffect(() => {
    const handleOnWindowClick = (e: Event) => {
      !isDescendant(containerRef.current, e.target) && onClick();
    };

    window.addEventListener('click', handleOnWindowClick);

    return () => window.removeEventListener('click', handleOnWindowClick);
  }, [onClick, containerRef]);
}

export default useOnOutsideClick;
