import { createMemo, For } from "solid-js";
import type { Component, JSX } from "solid-js";
import * as tooltip from "@zag-js/tooltip";
import * as toast from "@zag-js/toast";
import {
    normalizeProps,
    PropTypes,
    useActor,
    useMachine,
    useSetup,
    mergeProps,
} from "@zag-js/solid";

interface Props {
    command: string;
    children: JSX.Element;
}

const ToastItem = (props: { actor: toast.Service }) => {
    const [toastState, toastSend] = useActor(props.actor);
    const toastApi = createMemo(() =>
        toast.connect<PropTypes>(toastState, toastSend, normalizeProps)
    );

    return (
        <div {...mergeProps(toastApi().rootProps, { class: "toast" })}>
            <p {...toastApi().titleProps} innerHTML={toastApi().title} />
        </div>
    );
};

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
        id: props.command,
    });
    const tooltipApi = createMemo(() =>
        tooltip.connect<PropTypes>(tooltipState, tooltipSend, normalizeProps)
    );

    const [toastState, toastSend] = useMachine(
        toast.group.machine({
            max: 1,
        })
    );
    const toastRef = useSetup({ send: toastSend, id: `copy-${props.command}` });
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
            <div {...toastApi().getGroupProps({ placement: "top-end" })}>
                <For each={toastApi().toasts}>
                    {(actor) => <ToastItem actor={actor} />}
                </For>
            </div>
        </div>
    );
};
