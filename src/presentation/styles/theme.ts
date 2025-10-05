"use client";
import { colorsTuple, Container, createTheme, DEFAULT_THEME, Input, NumberInput } from "@mantine/core";
import cx from 'clsx';
import classes from './styles.module.css';
import { fontUrbanist } from "../config/fonts";


export const theme = createTheme({
	fontFamily: fontUrbanist.style.fontFamily,
	headings: {
		fontFamily: `${fontUrbanist.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
	},
	colors: {
		primary: colorsTuple('#790fbf'),
		secondary: colorsTuple('#8768F8'),
		terciary: colorsTuple("#000000"),
		dynamic: colorsTuple(
			Array.from({ length: 10 }, (_, index) => '#790fbf')
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
		NumberInput: {
			styles: {
				input: {
					color: "#000000",
					fontSize: 16,
					'&:disabled': {
						color: "#000000"
					}
				}

			}
		},
		TextInput: {
			styles: {
				input: {
					color: "#000000",
					fontSize: 16,
					'&:disabled': {
						color: "#000000"
					}
				}

			}
		}
	},
});