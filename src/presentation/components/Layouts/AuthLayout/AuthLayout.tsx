import {
    Container,
    Paper,
    Stack,
    Title,
} from '@mantine/core';
import classes from './styles.module.css';
import Image from 'next/image';
import { ImageResources } from '@/presentation/config/resources';
import Logo from '../../Logo';

interface Props {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form}>
                <Stack
                    align="stretch"
                    justify="center"
                    gap="md"
                    m={'auto'}
                >
                    <Logo size={250} />
                    <Title order={2} className={classes.title}>
                        Hola!, inicia sesión en tu cuenta
                    </Title>
                    {children}
                </Stack>
            </Paper>
            <Container fluid visibleFrom='sm' className={classes['office-background-wrapper']}>
                <div className={classes["background-overlay"]}>
                    <div className={classes.shape1}></div>
                    <div className={classes.shape2}></div>
                    <div className={classes.shape3}></div>
                </div>
                <div className={classes["quote-overlay"]}>
                    <div className={classes["quote-container"]}>
                        <div className={classes["quote-icon"]}>❝</div>
                        <blockquote className={classes["quote-text"]}>
                            Si creas una experiencia excelente, los clientes se lo contarán entre ellos. El voz a voz es muy poderoso.
                        </blockquote>
                        <cite className={classes["quote-author"]}>
                            Jeff Bezos, Fundador de Amazon
                        </cite>
                    </div>
                </div>
            </Container>
        </div>
    );
}