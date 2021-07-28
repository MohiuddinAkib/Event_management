import React from "react";
import {useSnackbar} from "notistack";
import {usePage} from "@inertiajs/inertia-react";

export const useErrorFlash = () => {
    const {enqueueSnackbar} = useSnackbar()
    const props = usePage().props

    React.useEffect(() => {
        if (props.flash.error) {
            enqueueSnackbar(props.flash.error, {variant: "error"});
        }
    }, [props.flash.error])
}
