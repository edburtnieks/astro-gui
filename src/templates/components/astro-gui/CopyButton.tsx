import { createMemo, For } from "solid-js";
import type { Component, JSX } from "solid-js";
import * as tooltip from "@zag-js/tooltip";
import * as toast from "@zag-js/toast";
import {
    normalizeProps,
    PropTypes,
    useMachine,
    useSetup,
    mergeProps,
} from "@zag-js/solid";
import { ToastItem } from "./ToastItem";

interface Props {
    command: string;
    children: JSX.Element;
}

export const CopyButton: Component<Props> = (props: Props) => {
    const [tooltipState, tooltipSend] = useMachine(
        tooltip.machine({
            openDelay: 0,
            closeDelay: 0,
            positioning: {
                placement: "top",
            },
            "aria-label": `Copy ${props.command} to clipboard`,
        })
    );
    const tooltipRef = useSetup<HTMLButtonElement>({
        send: tooltipSend,
        id: `tooltip-copy-${props.command}`,
    });
    const tooltipApi = createMemo(() =>
        tooltip.connect<PropTypes>(tooltipState, tooltipSend, normalizeProps)
    );

    const [toastState, toastSend] = useMachine(
        toast.group.machine({
            max: 1,
            gutter: "4rem",
        })
    );
    const toastRef = useSetup({
        send: toastSend,
        id: `toast-copy-${props.command}`,
    });
    const toastApi = createMemo(() =>
        toast.group.connect<PropTypes>(toastState, toastSend, normalizeProps)
    );

    const copy = async () => {
        await navigator.clipboard.writeText(props.command);
        toastApi().create({
            title: `<code>${props.command}</code> copied to clipboard`,
            type: "success",
        });
    };

    return (
        <div>
            <button
                ref={tooltipRef}
                {...mergeProps(tooltipApi().triggerProps, {
                    class: "copy-button",
                    onClick: copy,
                    "aria-label": `Copy ${props.command} to clipboard`,
                })}
            >
                {props.children}
            </button>
            {tooltipApi().isOpen && (
                <div
                    {...mergeProps(tooltipApi().positionerProps, {
                        class: "tooltip",
                    })}
                >
                    <div {...tooltipApi().arrowProps}>
                        <div {...tooltipApi().innerArrowProps} />
                    </div>
                    <div {...tooltipApi().contentProps}>
                        <span>Copy to clipboard</span>
                        <div {...tooltipApi().labelProps} />
                    </div>
                </div>
            )}
            <div {...toastApi().getGroupProps({ placement: "top" })}>
                <For each={toastApi().toasts}>
                    {(actor) => <ToastItem actor={actor} />}
                </For>
            </div>
        </div>
    );
};
