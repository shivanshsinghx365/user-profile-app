document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  const profileForm = document.getElementById('profileForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const interestsContainer = document.getElementById('interests-container');
  const locationsContainer = document.getElementById('locations-container');
  const notification = document.getElementById('notification');
  const travelTypeContainer = document.getElementById('travel-type-container');
  const budgetPreferenceContainer = document.getElementById('budget-preference-container');
  const spendingRangeInput = document.getElementById('spendingRange');
  const spendingRangeValueDisplay = document.getElementById('spendingRangeValue');
  // Add click listeners to selection items
  addSelectionListeners(interestsContainer);
  addSelectionListeners(locationsContainer);
  addSelectionListeners(travelTypeContainer);
  addSelectionListeners(budgetPreferenceContainer);

  spendingRangeInput.addEventListener('input', function() {
    spendingRangeValueDisplay.textContent = 'Value: $' + this.value;
  });
  // Check if user is logged in (via email in URL)
  const urlParams = new URLSearchParams(window.location.search);
  const userEmail = urlParams.get('email');
  
  if (userEmail) {
    loadUserProfile(userEmail);
  }
  
  // Form submission
  profileForm.addEventListener('submit', function(e) {
    e.preventDefault();
    saveUserProfile();
  });
  
  // Add click event listeners to selection items
    // Add click event listeners to selection items
    function addSelectionListeners(container) {
      const items = container.querySelectorAll('.selection-item');
      items.forEach(item => {
        item.addEventListener('click', function() {
          // For single selection containers, deselect other items
          if (container === travelTypeContainer || container === budgetPreferenceContainer) {
            container.querySelectorAll('.selection-item.selected').forEach(selectedItem => {
              if (selectedItem !== this) {
                selectedItem.classList.remove('selected');
              }
            });
          }
          this.classList.toggle('selected');
        });
      });
    }
  
  // Load user profile from API
  async function loadUserProfile(email) {
    try {
      const response = await fetch(`/api/user/${email}`);
      const data = await response.json();
      
      if (data.success) {
        const user = data.data;
        
        // Populate form fields
        nameInput.value = user.name;
        emailInput.value = user.email;
        
        // Select interests
        if (user.interests && user.interests.length > 0) {
          selectItems(interestsContainer, user.interests);
        }
        
        // Select locations
        if (user.locations && user.locations.length > 0) {
          selectItems(locationsContainer, user.locations);
        }
                // Select travel type
                if (user.travelType) {
                  selectItem(travelTypeContainer, user.travelType);
                }
        
                // Select budget preference
                if (user.budgetPreference) {
                  selectItem(budgetPreferenceContainer, user.budgetPreference);
                }
        
                // Set spending range
                if (user.spendingRange) {
                  spendingRangeInput.value = user.spendingRange;
                  spendingRangeValueDisplay.textContent = 'Value: $' + user.spendingRange;
                }
      }
    } catch (error) {
      showNotification('Error loading profile: ' + error.message, 'error');
    }
  }
    // Select a single item in a container based on value
    function selectItem(container, value) {
      const items = container.querySelectorAll('.selection-item');
      items.forEach(item => {
        if (item.dataset.value === value) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected'); // Deselect other items
        }
      });
    }
  // Select items in a container based on values
  function selectItems(container, values) {
    const items = container.querySelectorAll('.selection-item');
    items.forEach(item => {
      if (values.includes(item.dataset.value)) {
        item.classList.add('selected');
      }
    });
  }
  
  // Save user profile to API
  async function saveUserProfile() {
    // Get form data
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    
    // Validate required fields
    if (!name || !email) {
      showNotification('Name and email are required', 'error');
      return;
    }
    
    // Get selected interests
    const interests = [];
    const selectedInterests = interestsContainer.querySelectorAll('.selected');
    selectedInterests.forEach(item => {
      interests.push(item.dataset.value);
    });
    
    // Get selected locations
    const locations = [];
    const selectedLocations = locationsContainer.querySelectorAll('.selected');
    selectedLocations.forEach(item => {
      locations.push(item.dataset.value);
    });
        // Get selected travel type
        const travelTypeItem = travelTypeContainer.querySelector('.selected');
        const travelType = travelTypeItem ? travelTypeItem.dataset.value : '';
    
        // Get selected budget preference
        const budgetPreferenceItem = budgetPreferenceContainer.querySelector('.selected');
        const budgetPreference = budgetPreferenceItem ? budgetPreferenceItem.dataset.value : '';
    
        // Get spending range
        const spendingRange = spendingRangeInput.value;
    // Create user data object
    const userData = {
      name,
      email,
      interests,
      locations,
      travelType,
      budgetPreference,
      spendingRange
    };
    
    // Send data to API
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        showNotification('Profile saved successfully!', 'success');
        
        // Update URL with email for bookmarking
        if (!urlParams.has('email')) {
          const newUrl = `${window.location.pathname}?email=${encodeURIComponent(email)}`;
          window.history.pushState({ path: newUrl }, '', newUrl);
        }
      } else {
        showNotification('Error: ' + data.message, 'error');
      }
    } catch (error) {
      showNotification('Error saving profile: ' + error.message, 'error');
    }
  }
  
  // Show notification
  function showNotification(message, type) {
    notification.textContent = message;
    notification.className = 'notification ' + type;
    
    // Show notification
    setTimeout(() => {
      notification.classList.remove('hidden');
    }, 10);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      notification.classList.add('hidden');
    }, 3000);
  }
});
