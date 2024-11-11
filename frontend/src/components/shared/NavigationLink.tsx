import { Link } from 'react-router-dom'

type Props = {
    to: string,
    text: string,
    bg: string,
    textcolor: string,
    onClick?: () => Promise<void>;
};

const NavigationLink = (props: Props) => {
    return (
        <Link
            className='navLink'
            to={props.to}
            style={{ backgroundColor: props.bg, color: props.textcolor }}
        >
            {props.text}
        </Link>
    );
};

export default NavigationLink;