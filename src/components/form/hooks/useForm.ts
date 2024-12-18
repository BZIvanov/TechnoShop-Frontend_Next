import {
  useForm as useRHForm,
  type UseFormProps,
  type UseFormReturn,
  type FieldValues,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface UseFormWithSchemaProps<T extends FieldValues>
  extends UseFormProps<T> {
  schema?: yup.AnyObjectSchema;
}

export function useForm<T extends FieldValues>(
  props?: UseFormWithSchemaProps<T>
): UseFormReturn<T> {
  const { schema, ...rest } = props || {};

  return useRHForm<T>({
    resolver: schema ? yupResolver(schema) : undefined,
    ...rest,
  });
}
