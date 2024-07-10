interface ResponseMessageProps {
    message: string;
}

const ResponseMessage: React.FC<ResponseMessageProps> = ({ message }) => {
    return message ? <p className="text-white mt-5">{message}</p> : null;
};

export default ResponseMessage;
