<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";

  // import { superForm, setMessage, setError } from "sveltekit-superforms/client";
  import { setError, setMessage, superForm } from "sveltekit-superforms/client";
  import { zod } from "sveltekit-superforms/adapters";
  import { z } from "zod";

  // import { browser } from "$app/environment";

  const _userSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(2),
    email: z.string().email(),
  });

  const defaultData = {
    id: 1,
    name: "Philipp",
    email: "test@mydomain.de",
  };

  const { form, errors, message, constraints, enhance } = superForm(
    defaultData,
    {
      SPA: true,
      validators: zod(_userSchema),
      // validationMethod: 'oninput',
      onUpdate({ form }) {
        // Form validation
        console.log('onUpdate',{form});
        

        if (form.data.email.includes('spam')) {
          $errors.email = ['Suspicious email address.'];
          // not applied due to $app/forms.applyAction() not correclty overwritten
          setError(form, 'email', 'Suspicious email address.');
        } else if (form.valid) {
          // TODO: Call an external API with form.data, await the result and update form
          // not applied due to $app/forms.applyAction() not correclty overwritten
          setMessage(form, 'Valid data!');
        }
      },
    }
  );
</script>

<main>
  <!-- test {$browser} -->
  {#if $message}<h3>{$message}</h3>{/if}

  <form method="POST" use:enhance>
    <p>

      <label>
        Name<br />
        <input
        aria-invalid={$errors.name ? "true" : undefined}
        bind:value={$form.name}
        {...$constraints.name}
        />
      </label>
    </p>
      {#if $errors.name}<p class="invalid">{$errors.name}</p>{/if}

    <p>

      <label>
        E-mail<br />
        <input
        type="email"
        aria-invalid={$errors.email ? "true" : undefined}
        bind:value={$form.email}
        {...$constraints.email}
        />
      </label>
    </p>
      {#if $errors.email}<p class="invalid">{$errors.email}</p>{/if}

    <button>Submit</button>
  </form>
</main>

