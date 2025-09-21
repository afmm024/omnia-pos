"use client";
import { colorsTuple, Container, createTheme, DEFAULT_THEME } from "@mantine/core";
import cx from 'clsx';
import classes from './styles.module.css';
import { fontUrbanist } from "../config/fonts";


export const theme = createTheme({
	fontFamily:  fontUrbanist.style.fontFamily,
	headings: {
		fontFamily: `${fontUrbanist.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
	},
	colors: {
		primary: colorsTuple('#BF0426'),
		secondary: colorsTuple('#F20F38'),
		terciary: colorsTuple("#8C031C"),		
		dynamic: colorsTuple(
		  Array.from({ length: 10 }, (_, index) => '#242B80')
		),
	},
	primaryColor: "primary",
	defaultRadius: "md",
	components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
      }),
    }),
  },
});