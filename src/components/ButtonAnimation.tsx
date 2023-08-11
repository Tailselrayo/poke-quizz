import { ButtonProps } from "@mantine/core";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonAnimationProps extends ButtonProps{
    children: ReactNode;
    delay?: number;
    mounted?: boolean;
}

export function ButtonAnimation(props: ButtonAnimationProps) {
    const button = {
        appear: {
            scale: 1,
            rotate: 0,
        },
        disappear: {
            scale: 0,
            rotate: -10,
        },
    }

    return(
        <motion.div
            variants={button}
            initial="disappear"
            animate={props.mounted!==false?"appear":"disappear"}
            transition={{
                delay: props.delay,
                scale: {type: "spring", bounce: 0.4,},
                rotate: {type: "spring", bounce: 0.7},
            }}
        >{props.children}</motion.div>
    )
}