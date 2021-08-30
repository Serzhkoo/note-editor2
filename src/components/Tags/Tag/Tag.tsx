import React from 'react';

import styles from './Tag.module.scss';

type TagPropsType = {
  tag: string
  onTagClick: (tag: string) => void
  onDeleteTagClickHandler: (tag: string) => void
}

export const Tag: React.FC<TagPropsType> = React.memo(({ tag, onTagClick, onDeleteTagClickHandler }) => {

  return (
    <div className={styles.tagBlock}>
      <span className={styles.tag} onClick={() => onTagClick(tag)}>#{tag.toLowerCase()}</span>
      <button onClick={() => onDeleteTagClickHandler(tag)}>x</button>
    </div>
  );
});