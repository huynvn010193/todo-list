import { useFirestore } from "@/lib/firebase";
import { Tool } from "@/constants/type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, getDocs } from "firebase/firestore";

export const useTools = () => {
  const db = useFirestore();

  return useQuery<Tool[]>({
    queryKey: ["tools"],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "tools"));
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Tool[];
    },
  });
};

export const useAddTool = () => {
  const db = useFirestore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, description, url }: Partial<Tool>) => {
      const toolsCollection = collection(db, "tools");
      const newTool: Partial<Tool> = {
        title,
        description,
        url,
      };
      return await addDoc(toolsCollection, newTool);
    },
    onSuccess: () => {
      // Refetch tools sau khi thêm thành công
      queryClient.invalidateQueries({ queryKey: ["tools"] });
    },
  });
};
