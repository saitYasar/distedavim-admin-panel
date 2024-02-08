import  { FC } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface FullScreenLoadingProps {
    visibled : boolean
}

 const FullScreenLoading : FC<FullScreenLoadingProps> =({visibled}) => {

  return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={visibled}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  );
}
export default FullScreenLoading;