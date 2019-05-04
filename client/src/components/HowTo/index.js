import swal from 'sweetalert';

const Swal = () => {
swal("To add new secrets, hit the 'Add New' button on the home screen and input your secrets in the given fields.", {
    buttons: {
      close: false,
      next: true,
    },
  })
  .then((value) => {
    switch (value) {
   
      case "next":
        swal("To check your secrets, click the lock button on the card and input the PIN you chose when signing up.");
        break;

      default:
        break;
    }
  });
}

export default Swal;