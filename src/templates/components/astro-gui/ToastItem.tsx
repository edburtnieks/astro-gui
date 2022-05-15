import { createMemo } from "solid-js";
import type { Component } from "solid-js";
import * as toast from "@zag-js/toast";
import { normalizeProps, PropTypes, useActor, mergeProps } from "@zag-js/solid";

interface Props {
    actor: toast.Service;
}

export const ToastItem: Component<Props> = (props) => {
    const [state, send] = useActor(props.actor);
    const api = createMemo(() =>
        toast.connect<PropTypes>(state, send, normalizeProps)
    );

    return (
        <div {...mergeProps(api().rootProps, { class: "toast" })}>
            <p {...api().titleProps} innerHTML={api().title} />
            <div class="progressbar-wrapper">
                <div {...api().progressbarProps} />
            </div>
        </div>
    );
};
