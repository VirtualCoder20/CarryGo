package com.alphatech.rain.backend.repository;

import com.alphatech.rain.backend.models.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface OtpRepository extends JpaRepository<Otp, Long> {

    Optional<Otp> findTopByPhoneAndVerifiedFalseOrderByIdDesc(String phone);

    @Modifying
    @Transactional
    @Query("DELETE FROM Otp o WHERE o.phone = :phone")
    void deleteAllByPhone(String phone);
}
