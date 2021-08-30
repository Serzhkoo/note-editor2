import React from 'react';

import styles from './Tags.module.scss';

import { Tag } from './Tag/Tag';

type TagsPropsType = {
  tags: string[]
  onTagClick: (tag: string) => void
  onDeleteTagClickHandler: (tag: string) => void
  onResetClickHandler: () => void
}
export const Tags: React.FC<TagsPropsType> = ({ tags, onTagClick, onDeleteTagClickHandler, onResetClickHandler }) => {

  return (
    <div className={styles.tags}>
      <div>
        {tags.length
          ? tags.map(tag =>
            <Tag
              key={tag}
              tag={tag}
              onTagClick={onTagClick}
              onDeleteTagClickHandler={onDeleteTagClickHandler}
            />)
          : <div>No saved tags</div>
        }
      </div>
      <div>
        <button onClick={onResetClickHandler}>Reset filter</button>
      </div>
    </div>
  );
};