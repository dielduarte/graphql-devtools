import classNames from 'classnames';
import styles from './Filters.module.css';

interface GetFilterClassNamesParams {
  isQuery?: boolean;
  isMutation?: boolean;
  active?: boolean;
}

export const getFilterClassNames = (params?: GetFilterClassNamesParams) => {
  return classNames({
    [styles.filter]: true,
    [styles.query]: params?.isQuery ?? false,
    [styles.mutation]: params?.isMutation ?? false,
    [styles.active]: params?.active ?? false,
  });
};
