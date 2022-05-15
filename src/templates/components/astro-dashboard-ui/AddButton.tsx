import type { Component, JSX } from "solid-js";
import { createSignal, createMemo } from "solid-js";
import * as tooltip from "@zag-js/tooltip";
import {
    normalizeProps,
    PropTypes,
    useMachine,
    useSetup,
    mergeProps,
} from "@zag-js/solid";

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
        id: `add-${props.command}`,
    });
    const tooltipApi = createMemo(() =>
        tooltip.connect<PropTypes>(tooltipState, tooltipSend, normalizeProps)
    );

    const [shouldCheckConsole, setShouldCheckConsole] = createSignal(false);

    return (
        <div>
            {shouldCheckConsole() ? <p>Check the console</p> : null}
            <button
                ref={tooltipRef}
                {...mergeProps(tooltipApi().triggerProps, {
                    type: "submit",
                    name: "command",
                    value: props.command,
                    class: "card-add-button",
                    onClick: () => setShouldCheckConsole(true),
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
        </div>
    );
};
