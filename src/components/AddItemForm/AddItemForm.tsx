import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import styles from './AddItemForm.module.scss'

type AddItemFormPropsType = {
  addItem: (title: string) => void
  name: string
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({ addItem, name }) => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<string>('')

  const inputHandle = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.currentTarget.value);
  };

  const onAddItemClick = (): void => {
    if (title.trim() === '') {
      setError(`${name.split(' ')[1]} is required!`);
    } else {
      addItem(title);
      setTitle('');
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    error !== '' && setError('');
    e.key === 'Enter' && onAddItemClick();
  };

  const inputClassName: string = `${styles.input} ${error ? styles.errorInput : ''}`

  return (
    <div>
      <div className={styles.addItemForm}>
        <input
          className={inputClassName}
          value={title}
          onChange={inputHandle}
          type="text"
          placeholder={`enter ${name}`}
          onKeyPress={onKeyPressHandler}
        />
        <button onClick={onAddItemClick}>{`Add ${name.split(' ')[0]}`}</button>
      </div>
      <div className={styles.error}>
        {error}
      </div>
    </div>
  );
});