export {}



interface FetchOptions<TBody> {
    url: string;
    method: string;
    body?: TBody;
    headers?: HeadersInit;
  }
  
export async function fetchWithBody<TBody, TResponse>(
    options: FetchOptions<TBody>,
    onSuccess: (data: TResponse) => void,
    onError: (error: Error) => void
  ): Promise<void> {
    const { url, method, body, headers } = options;
  
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data: TResponse = await response.json();
      onSuccess(data);
    } catch (error) {
      if (error instanceof Error) {
        onError(error);
      } else {
        onError(new Error('Unknown error occurred'));
      }
    }
  }

// export const createCart = async (data: Partial<T>) => {
//     const {add_relations} = data
//     console.log("data: ", data);
//     delete data.add_relations
//     console.log("data: ", data);
    
//     console.log("add_relations: ", add_relations)
//     console.log(`${API_URI}users/add_user${add_relations ? `?${user_id}` : ""}`);
    
//     try {
//       const response = await fetch(`${API_URI}users/create_user${add_relations ? `?add_relations=${user_id}` : ""}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json", // קביעת סוג התוכן ל-JSON
//         },
//         body: JSON.stringify(data),
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const response1 = await response.json(); // קביעת טיפוס עבור התגובה שהתקבלה
//       console.log(response1);
//       console.log("User added successfully");
//       handleDrawerClose();
//       reset();
//       dispatch(setSnackbar({snackbarOpen: true, snackbarType: "success", snackbarMessage: "User added successfully"}));
//       fetchUsers();
//     } catch (error) {
//       console.error("Failed to add user:", error);
//      dispatch(setSnackbar({snackbarOpen: true, snackbarType: "error", snackbarMessage: "Failed to add user"}));
//     } 
//   };

