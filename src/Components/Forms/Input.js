import React from "react";
import styles from "./Input.module.css";

const Input = ({
  label,
  type,
  name,
  onChange,
  value,
  error,
  validate,
  onBlur,
}) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        className={styles.input}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
