<?php

namespace App\Providers;

use App\Repository\ActivityRepositoryInterface;
use App\Repository\CardInfoRepositoryInterface;
use App\Repository\CouponRepositoryInterface;
use App\Repository\CouponSplanRepositoryInterface;
use App\Repository\CouponUserRepositoryInterface;
use App\Repository\Eloquent\ActivityRepository;
use App\Repository\Eloquent\BaseRepository;
use App\Repository\Eloquent\CardInfoRepository;
use App\Repository\Eloquent\CouponRepository;
use App\Repository\Eloquent\CouponSplanRepository;
use App\Repository\Eloquent\CouponUserRepository;
use App\Repository\Eloquent\FeatureRepository;
use App\Repository\Eloquent\NotificationDetailsRepository;
use App\Repository\Eloquent\NotificationRepository;
use App\Repository\Eloquent\OrganizationRepository;
use App\Repository\Eloquent\PaymentAttemptRepository;
use App\Repository\Eloquent\PaymentReferenceRepository;
use App\Repository\Eloquent\PurchaseRepository;
use App\Repository\Eloquent\RefundRepository;
use App\Repository\Eloquent\SettingsRepository;
use App\Repository\Eloquent\StorageSizeRepository;
use App\Repository\Eloquent\SubscriptionCancelRepository;
use App\Repository\Eloquent\SubscriptionPlanFeatureRepository;
use App\Repository\Eloquent\SubscriptionPlanRepository;
use App\Repository\Eloquent\SubscriptionRequestRepository;
use App\Repository\Eloquent\UserRepository;
use App\Repository\Eloquent\ValidityPriodRepository;
use App\Repository\EloquentRepositoryInterface;
use App\Repository\FeatureRepositoryInterface;
use App\Repository\NotificationDetailsRepositoryInterface;
use App\Repository\NotificationRepositoryInterface;
use App\Repository\OrganizationRepositoryInterface;
use App\Repository\PaymentAttemptRepositoryInterface;
use App\Repository\PaymentReferenceRepositoryInterface;
use App\Repository\PurchaseRepositoryInterface;
use App\Repository\RefundRepositoryInterface;
use App\Repository\SettingsRepositoryInterface;
use App\Repository\StorageSizeRepositoryInterface;
use App\Repository\SubscriptionCancelRepositoryInterface;
use App\Repository\SubscriptionPlanFeatureRepositoryInterface;
use App\Repository\SubscriptionPlanRepositoryInterface;
use App\Repository\SubscriptionRequestRepositoryInterface;
use App\Repository\UserRepositoryInterface;
use App\Repository\ValidityPriodRepositoryInterface;
use Illuminate\Support\ServiceProvider;

/**
 * Class RepositoryServiceProvider
 */
class RepositoryServiceProvider extends ServiceProvider {
    /**
     * Register services.
     *
     * @return void
     */
    public function register() {
        $this->app->bind(EloquentRepositoryInterface::class, BaseRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(SubscriptionPlanRepositoryInterface::class, SubscriptionPlanRepository::class);
        $this->app->bind(SubscriptionPlanFeatureRepositoryInterface::class, SubscriptionPlanFeatureRepository::class);
        $this->app->bind(SubscriptionRequestRepositoryInterface::class, SubscriptionRequestRepository::class);
        $this->app->bind(FeatureRepositoryInterface::class, FeatureRepository::class);
        $this->app->bind(OrganizationRepositoryInterface::class, OrganizationRepository::class);
        $this->app->bind(PurchaseRepositoryInterface::class, PurchaseRepository::class);
        $this->app->bind(CouponRepositoryInterface::class, CouponRepository::class);
        $this->app->bind(CouponUserRepositoryInterface::class, CouponUserRepository::class);
        $this->app->bind(CouponSplanRepositoryInterface::class, CouponSplanRepository::class);
        $this->app->bind(StorageSizeRepositoryInterface::class, StorageSizeRepository::class);
        $this->app->bind(ValidityPriodRepositoryInterface::class, ValidityPriodRepository::class);
        $this->app->bind(SettingsRepositoryInterface::class, SettingsRepository::class);
        $this->app->bind(ActivityRepositoryInterface::class, ActivityRepository::class);
        $this->app->bind(CardInfoRepositoryInterface::class, CardInfoRepository::class);
        $this->app->bind(PaymentAttemptRepositoryInterface::class, PaymentAttemptRepository::class);
        $this->app->bind(SubscriptionCancelRepositoryInterface::class, SubscriptionCancelRepository::class);
        $this->app->bind(RefundRepositoryInterface::class, RefundRepository::class);
        $this->app->bind(PaymentReferenceRepositoryInterface::class, PaymentReferenceRepository::class);
        $this->app->bind(NotificationDetailsRepositoryInterface::class, NotificationDetailsRepository::class);
        $this->app->bind(NotificationRepositoryInterface::class, NotificationRepository::class);

    }
}
