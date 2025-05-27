import { Button, Spinner } from 'react-bootstrap';

export default function ActionButton({ 
  children, 
  isLoading, 
  variant = 'primary',
  ...props 
}) {
  return (
    <Button variant={variant} disabled={isLoading} {...props}>
      {isLoading ? (
        <>
          <Spinner as="span" animation="border" size="sm" />
          <span className="ms-2">Processing...</span>
        </>
      ) : children}
    </Button>
  );
}