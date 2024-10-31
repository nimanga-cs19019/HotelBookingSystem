package com.example.HotelBooking.Service;


import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {
    @Value("${STRIPE_SECRET_KEY}")
    private String stripeSecretKey;

    public String createCustomer(String email, String name) throws StripeException {
        Stripe.apiKey = stripeSecretKey;
        Customer customer=null;
        Map<String, Object> CustomerCreateParams = new HashMap<String, Object>();
        CustomerCreateParams.put("description",name);
        CustomerCreateParams.put("email",email);
        Map<String, String> initialMetaData = new HashMap<String, String>();
        initialMetaData.put("user email",email);
        CustomerCreateParams.put("metadata",initialMetaData);
        try {
            customer=Customer.create(CustomerCreateParams);
        }catch (StripeException e)
        {
            e.printStackTrace();
        }
        return customer.getId();
    }
}
