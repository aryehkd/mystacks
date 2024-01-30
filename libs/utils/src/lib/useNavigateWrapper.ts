import { useNavigate } from "react-router-dom";

export const useRouterWrapper = () => {

    const navigate = useNavigate();

    return (
        navigate
    )
}