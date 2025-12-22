'use client';

import { useMotionTemplate, useMotionValue, motion } from 'framer-motion';
import React, { MouseEvent as ReactMouseEvent, useState } from 'react';
import { cn } from '@/lib/utils';

export const Spotlight = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({
        currentTarget,
        clientX,
        clientY,
    }: ReactMouseEvent) {
        let { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={cn(
                'group relative flex flex-col',
                className
            )}
            onMouseMove={handleMouseMove}
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as React.ReactElement<any>, {
                        //@ts-ignore
                        mouseX,
                        //@ts-ignore
                        mouseY,
                    });
                }
                return child;
            })}
        </div>
    );
};

export const SpotLightItem = ({
    children,
    className,
    mouseX,
    mouseY,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    mouseX?: any;
    mouseY?: any;
} & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn(
                'group/spotlight-item relative border-none bg-transparent overflow-hidden',
                className
            )}
            {...props}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover/spotlight-item:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
                }}
            />
            {children}
        </div>
    );
};
