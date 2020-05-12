import classNames from 'classnames';
import React from 'react';

export default <T>(styles: Record<string, string>) => {
  const [internalStyles] = React.useState(styles);
  return (conditions: { [key in keyof T]?: boolean }): string => {
    return classNames(
      Object.entries(conditions).reduce((acc, [key, value]) => {
        return internalStyles[key] ? { ...acc, [internalStyles[key]]: value ?? false } : acc;
      }, {}),
    );
  };
};
