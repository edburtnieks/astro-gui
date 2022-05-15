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

export const AddButton: Component<Props> = (props: Props) => {
    const [tooltipState, tooltipSend] = useMachine(
        tooltip.machine({
            openDelay: 0,
            closeDelay: 0,
            positioning: {
                placement: "top",
            },
            "aria-label": `Execute ${props.command} in current terminal session`,
        })
    );
    const tooltipRef = useSetup<HTMLButtonElement>({
        send: tooltipSend,
        id: `tooltip-add-${props.command}`,
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
        id: `toast-add-${props.command}`,
    });
    const toastApi = createMemo(() =>
        toast.group.connect<PropTypes>(toastState, toastSend, normalizeProps)
    );

    return (
        <div>
            <button
                ref={tooltipRef}
                {...mergeProps(tooltipApi().triggerProps, {
                    type: "submit",
                    name: "command",
                    value: props.command,
                    class: "card-add-button",
                    onClick: () => {
                        toastApi().create({
                            title: "Check the console",
                            type: "loading",
                        });
                    },
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
                        <span>Execute in terminal</span>
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
