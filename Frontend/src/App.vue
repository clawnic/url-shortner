<script setup lang="ts">
import { ref } from 'vue'

const longUrl = ref('')
const shortUrl = ref('')
const error = ref('')
const isLoading = ref(false)

const shortenUrl = async () => {
    if (!longUrl.value) {
        error.value = 'Please enter a URL'
        return
    }

    try {
        isLoading.value = true
        error.value = ''
        
        const response = await fetch('http://localhost:5000/url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ long_url: longUrl.value }),
        })

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data = await response.json()
        if (data.short_url) {
            shortUrl.value = data.short_url
        } else {
            error.value = 'Invalid response from server'
        }
    } catch (err) {
        error.value = 'Failed to shorten URL: ' + (err instanceof Error ? err.message : 'Unknown error')
        console.error(err)
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
  <div class="container">
    <h1>URL Shortener</h1>
    
    <form @submit.prevent="shortenUrl" class="form">
      <input
        v-model="longUrl"
        type="url"
        placeholder="Enter your URL here"
        required
        class="input"
      />
      <button type="submit" :disabled="isLoading" class="button">
        {{ isLoading ? 'Shortening...' : 'Shorten URL' }}
      </button>
    </form>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="shortUrl" class="result">
      <p>Shortened URL:</p>
      <a :href="shortUrl" target="_blank" class="shortened-url">{{ shortUrl }}</a>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
}

.form {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error {
  color: #ff0000;
  margin: 1rem 0;
}

.result {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 4px;
}

.shortened-url {
  color: #2c3e50;
  word-break: break-all;
}
</style>