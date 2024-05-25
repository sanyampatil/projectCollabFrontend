import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup
} from '@mui/material'
import React, { useState } from 'react'
import Radio from '@mui/material/Radio'
import axios from 'axios'
import { useEffect } from 'react'
import PlanCard from '../Constant/PlanCard'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import {
  getRazorPayId,
  purchaseCourseBundle,
  verifyUserPayment
} from '../../redux/slices/paymentSlice'
import { useNavigate } from 'react-router-dom'

const ScheduleStep3 = () => {
  const [male, setmale] = useState(true)
  const [morning, setmorning] = useState()
  const [data, setData] = useState()
  console.log('start')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  async function getplan () {
    const response = await axios.get(
      'http://localhost:5000/api/plan/getAllPlan'
    )
    setData(response.data)
  }

  const razorpayKey = useSelector(state => state?.razorpay?.key)
  const subscription_id = useSelector(state => state?.razorpay?.subscription_id)
  console.log('subscription_id', subscription_id)

  const userData = JSON.parse(localStorage.getItem('userData'))
  console.log('dataBase', userData._id)

  const paymentDetails = {
    razorpay_payment_id: '',
    razorpay_subscription_id: '',
    razorpay_signature: ''
  }

  async function handleSubscription (e) {
    e.preventDefault()
    console.log(razorpayKey, subscription_id)
    if (!razorpayKey || !subscription_id) {
      toast.error('Something went wrong')
      return
    }
    console.log('hii')

    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name: 'e-Shiksha Pvt. Ltd.',
      description: 'Subscription',
      theme: {
        color: '#F37254'
      },

      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id
        paymentDetails.razorpay_signature = response.razorpay_signature
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id
        paymentDetails.id = userData._id
        toast.success('Payment successfull')
        const res = await dispatch(verifyUserPayment(paymentDetails))
        console.log('navigate res', res)
        toast.success(res?.payload?.msg)
        console.log(res?.payload?.success)
        res?.payload?.success
          ? navigate('/checkout/success')
          : navigate('/checkout/fail')
      }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  async function load () {
    getplan()
    await dispatch(getRazorPayId())
    await dispatch(purchaseCourseBundle(userData._id))
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div>
      <div className=''>
        <FormControl>
          <FormLabel id='demo-radio-buttons-group-label'>
            {' '}
            <p className='text-4xl text-black  m-5 font-semibold p-2'>
              ➡ please select any one batch
            </p>
          </FormLabel>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='female'
            name='radio-buttons-group'
          >
            {/* /> */}
            <div className='flex'>
              {data &&
                data.map(e => {
                  return <PlanCard key={e.planId} plan={e} />
                })}
            </div>
          </RadioGroup>
        </FormControl>
        <div className='flex     mt-10'></div>
        <p className=' text-xl'>morning batches ➡️</p>
        <div class='flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700'>
          <input
            id='bordered-radio-1'
            type='radio'
            value=''
            name='bordered-radio'
            class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
          />
          <label
            for='bordered-radio-1'
            class='w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Default radio
          </label>
          <div className='  flex flex-col items-center justify-center mr-5'>
            <div
              class='relative inline-flex items-center justify-center w-10 h-10 overflow-hidden  rounded-full bg-green-500
'
            >
              <span class='font-bold  text-white  '>10</span>
            </div>
            available
          </div>
        </div>
        <div class='flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700'>
          <input
            checked
            id='bordered-radio-2'
            type='radio'
            value=''
            name='bordered-radio'
            class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
          />
          <label
            for='bordered-radio-2'
            class='w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Checked state
          </label>
        </div>

        <div class='flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700'>
          <input
            checked
            id='bordered-radio-2'
            type='radio'
            value=''
            name='bordered-radio'
            class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
          />
          <label
            for='bordered-radio-2'
            class='w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Checked state
          </label>
        </div>
      </div>
      <Button
        variant='contained'
        color='secondary'
        onClick={handleSubscription}
      >
        save and continue
      </Button>
    </div>
  )
}

export default ScheduleStep3
