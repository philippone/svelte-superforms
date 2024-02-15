<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'

  import { superForm, setMessage, setError } from 'sveltekit-superforms/client';
  import { zod } from 'sveltekit-superforms/adapters';
  import { z } from 'zod';

  import {browser} from '$app/environment';

  const _userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(2),
  email: z.string().email()
});

  const defaultData = {
    id: 1,
    name: 'Philipp',
    email: 'test@mydomain.de'
  };

  const { form, errors, message, constraints, enhance } = superForm(
    defaultData,
    {
      SPA: true,
      validators: _userSchema,
      onUpdate({ form }) {
        // Form validation
       
          if (form.valid) {
            setMessage(form, 'Valid data!');
        } else {

          setError(form, 'email', 'Suspicious email address.');
        }
      }
    }
  );

</script>

<main>
  {#if $message}<h3>{$message}</h3>{/if}

<form method="POST" use:enhance>
  <label>
    Name<br />
    <input
      aria-invalid={$errors.name ? 'true' : undefined}
      bind:value={$form.name}
      {...$constraints.name} />
  </label>
  {#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}

  <label>
    E-mail<br />
    <input
      type="email"
      aria-invalid={$errors.email ? 'true' : undefined}
      bind:value={$form.email}
      {...$constraints.email} />
  </label>
  {#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}

  <button>Submit</button>
</form>
</main>

<style>
  
</style>
