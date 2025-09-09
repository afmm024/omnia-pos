'use client'
import { Button, ButtonProps } from '@heroui/react'
import React from 'react'

export interface BaseButtonProps extends ButtonProps{
    minWidth?: string
} 

const BaseButton: React.FC<BaseButtonProps> = ({  ...props}: BaseButtonProps) => {
  return (
    <Button 
      className='w-full h-15 text-base'
      {...props} 
      />
  )
}

export default BaseButton