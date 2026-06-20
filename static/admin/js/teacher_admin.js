(function() {
    'use strict';
    
    console.log("Teacher Admin Custom JS initialized");

    function initTeacherForm() {
        const paymentMethodSelect = document.getElementById('id_payment_method');
        if (!paymentMethodSelect) {
            // If select not found, retry after a short delay (for dynamically loaded components)
            setTimeout(initTeacherForm, 100);
            return;
        }

        const rowPercentage = document.querySelector('.field-payment_percentage') || document.querySelector('.field-payment-percentage');
        const rowHourlyRate = document.querySelector('.field-hourly_rate') || document.querySelector('.field-hourly-rate');

        console.log("Form elements found:", {
            select: !!paymentMethodSelect,
            percentage: !!rowPercentage,
            hourly: !!rowHourlyRate
        });

        function toggleFields() {
            const val = paymentMethodSelect.value;
            console.log("Payment method changed to:", val);
            
            if (val === 'PERCENTAGE') {
                if (rowPercentage) rowPercentage.style.setProperty('display', 'block', 'important');
                if (rowHourlyRate) rowHourlyRate.style.setProperty('display', 'none', 'important');
            } else if (val === 'HOURLY') {
                if (rowPercentage) rowPercentage.style.setProperty('display', 'none', 'important');
                if (rowHourlyRate) rowHourlyRate.style.setProperty('display', 'block', 'important');
            } else {
                // If somehow empty or other val, show both
                if (rowPercentage) rowPercentage.style.removeProperty('display');
                if (rowHourlyRate) rowHourlyRate.style.removeProperty('display');
            }
        }

        paymentMethodSelect.addEventListener('change', toggleFields);
        toggleFields();
        
        // Also run toggleFields multiple times during loading transitions
        setTimeout(toggleFields, 100);
        setTimeout(toggleFields, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTeacherForm);
    } else {
        initTeacherForm();
    }
})();
