import { useActionState, useState } from "react";
import { sendOrderConfirmations } from '@/lib/actions';

import OrderFormSubmit from "./order-from-submit";
import classes from './order-form.module.css';

export default function OrderForm({ selectedQuantities }) {

  const sendOrderWithProps = async (
    prevState,
    formData
  ) => {
    return sendOrderConfirmations(
      prevState,
      formData,
      { selectedQuantities }
    );
  };

  const [state, formAction] = useActionState(sendOrderWithProps, { message: null });
  const [sliceToggleChecked, setSliceToggleChecked] = useState(true);

  const handleSliceToggleChange = () => {
    setSliceToggleChecked(!sliceToggleChecked);
  };

  return (
    <>
      {state.success ? (
        <>
          <div className={classes['success-msg']}>
            <p>ההזמנה נשלחה בהצלחה!</p>
            <strong>יש לבצע תשלום דרך סיכום ההזמנה שנשלח לכתובת המייל שסופקה.</strong>
          </div>
          <button onClick={() => location.reload()}>הזמנה חדשה</button>
        </>
      ) :
        state.success === false ? (
          <p className={classes['fail-msg']}>חלה שגיאה, נסו שוב מאוחר יותר</p>
        ) : (
          <form className={classes['order-form']} action={formAction}>
            <div className={classes['input-group']}>
              <label htmlFor="name">שם מלא</label>
              <input
                id='name'
                name='name'
                type="text"
                autoComplete="name"
                required
              />
            </div>

            <div className={classes['input-group']}>
              <label htmlFor="email">אימייל</label>
              <input
                id='email'
                name='email'
                type="email"
                autoComplete="email"
                required
              />
            </div>

            <div className={classes['input-group']}>
              <label htmlFor="phone">טלפון</label>
              <input
                id='phone'
                name='phone'
                type="tel"
                autoComplete="tel"
              />
            </div>

            <div className={classes['input-group']}>
              <label htmlFor="address">כתובת</label>
              <input
                id='address'
                name='address'
                type="text"
                autoComplete="street-address"
                placeholder='רחוב, מספר בית, עיר'
              />
            </div>

            <div className={classes['input-group']}>
              <label htmlFor="comment" style={{ alignSelf: 'start' }}>הערה</label>
              <textarea
                id='comment'
                name='comment'
                rows={4}
              />
            </div>

            <div className={`${classes['input-group']} ${classes['slice-toggle']}`}>

              <input
                type='checkbox'
                id='sliceToggle'
                name='sliceToggle'
                checked={sliceToggleChecked === true}
                value={sliceToggleChecked ? true : false}
                onChange={handleSliceToggleChange}
              />
              <label htmlFor='sliceToggle'>נא לפרוס את הלחמים</label>
            </div>
            <OrderFormSubmit />
          </form>
        )}
    </>
  )
}