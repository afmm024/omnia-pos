import { cn, Input, InputProps } from '@heroui/react';
import React from 'react';
import clsx from 'clsx';

export interface BaseInputProps extends InputProps {
  name: string;
  isInvalid?: boolean;
}

export const inputWrapperStyles = (isInvalid: boolean) =>
  clsx(
    '!shadow-none bg-white dark:bg-default/60 backdrop-blur-xl backdrop-saturate-200 hover:bg-gray-50 dark:hover:bg-default/70 group-data-[focus-visible=true]:bg-white group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-secondary-200 group-data-[focus-visible=true]:border-0 !cursor-text h-[54px] w-full pt-3 pr-4 pb-3 pl-4',
    isInvalid ? 'border-[3px] border-danger' : 'border-[2px] border-default-300'
  );

const BaseInput: React.FC<BaseInputProps> = ({
  name,
  label,
  value,
  isInvalid = false,
  ...props
}) => {

  const isInvalidVerified = isInvalid
  return (
    <Input
      {...props}
      data-id={name}
      name={name}
      autoComplete="new-password"
      labelPlacement="outside-top"
      label={label}
      defaultValue={value}
      value={value}
      variant="bordered"
      size="lg"
      radius="sm"
      isInvalid={isInvalid}
      color='primary'
      classNames={{
        label: 'text-black/50 dark:text-white/90 text-base font-medium',
        input: cn(
          'bg-transparent',
          'text-black/90 dark:text-white/90',
          'placeholder:text-default-700/80 dark:placeholder:text-white/60'
        ),
        innerWrapper: 'bg-transparent',
        inputWrapper: inputWrapperStyles(isInvalidVerified),
      }}
    />
  );
};

export default BaseInput;
