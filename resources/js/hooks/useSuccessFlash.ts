import React from "react";
import {useSnackbar} from "notistack";
import {usePage} from "@inertiajs/inertia-react";

export const useSuccessFlash = () => {
    const {enqueueSnackbar} = useSnackbar()
    const props = usePage().props

    React.useEffect(() => {
        if (props.flash.success) {
            enqueueSnackbar(props.flash.success, {variant: "success"});
        }
    }, [props.flash.success])
}
