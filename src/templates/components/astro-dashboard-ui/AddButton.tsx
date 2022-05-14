import type { Component, JSX } from "solid-js";
import { createSignal } from "solid-js";

interface Props {
    command: string;
    children: JSX.Element;
}

export const AddButton: Component<Props> = (props: Props) => {
    const [shouldCheckConsole, setShouldCheckConsole] = createSignal(false);

    return (
        <>
            {shouldCheckConsole() ? <p>Check the console</p> : null}
            <button
                type="submit"
                name="command"
                value={props.command}
                onClick={() => setShouldCheckConsole(true)}
            >
                {props.children}
            </button>
        </>
    );
};
